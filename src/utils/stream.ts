import client from "../configs/stream";
import ApiError from "./error";
import { v4 as uuidv4 } from "uuid";

export const createStreamUser = async (userId: string, userData: any) => {
  try {
    const userPayload: any = {
      id: userId,
      name: userData.name || `User ${userId}`,
    };
    
    // Only add image if profile exists and is a valid URL
    if (userData.profile) {
      userPayload.image = userData.profile.startsWith('http') 
        ? userData.profile 
        : undefined;
    }
    
    await client.upsertUsers([userPayload]);
    return true;
  } catch (error: any) {
    console.error("Error creating stream user:", error);
    throw new ApiError(500, `Failed to create stream user: ${error.message || 'Unknown error'}`);
  }
};

export const createVideoCallSession = async (
  mentorData: any,
  studentData: any
) => {
  try {
    // first create user in stream
    await createStreamUser(mentorData.id, mentorData);
    await createStreamUser(studentData.id, studentData);

    const callId = uuidv4();
    const call = client.video.call("default", callId);
    
    // Create the call without pre-adding members
    // Members will be added when they join from the client
    await call.getOrCreate({
      data: {
        created_by_id: mentorData.id,
        settings_override: {
          audio: {
            mic_default_on: true,
            default_device: "speaker",
          },
          video: {
            camera_default_on: true,
            target_resolution: {
              width: 1280,
              height: 720,
              bitrate: 1000000,
            },
          },
          screensharing: {
            enabled: true,
          },
          recording: {
            mode: "disabled",
          },
        },
      },
    });

    const mentorToken = client.generateUserToken({ user_id: mentorData.id });
    const studentToken = client.generateUserToken({ user_id: studentData.id });

    return {
      callId,
      mentorToken,
      studentToken,
    };
  } catch (error: any) {
    console.error("Error creating video call session:", error);
    throw new ApiError(500, `Failed to create video call session: ${error.message || 'Unknown error'}`);
  }
};

export const generateUserCallToken = (userId: string) => {
  try {
    return client.generateUserToken({ user_id: userId });
  } catch (error: any) {
    console.error("Error generating user call token:", error);
    throw new ApiError(500, `Failed to generate user call token: ${error.message || 'Unknown error'}`);
  }
};

export const endSession = async (callId: string) => {
  try {
    const call = client.video.call("default", callId);
    await call.end();
    return true;
  } catch (error: any) {
    console.error("Error ending video call session:", error);
    // Don't throw error if call is already ended
    if (error.message?.includes('not found') || error.message?.includes('already ended')) {
      console.log('Call already ended or not found, continuing...');
      return true;
    }
    throw new ApiError(500, `Failed to end video call session: ${error.message || 'Unknown error'}`);
  }
};

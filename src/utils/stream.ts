import client from "../configs/stream";
import ApiError from "./error";
import { v4 as uuidv4 } from "uuid";

export const createStreamUser = async (userId: string, userData: any) => {
  try {
    await client.upsertUsers([
      {
        id: userId,
        name: userData.name || `User ${userId}`,
        image: userData.profile || undefined,
      },
    ]);
    return true;
  } catch (error) {
    console.error("Error creating stream user:", error);
    throw new ApiError(500, "Failed to create stream user");
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
    await call.getOrCreate({
      data: {
        created_by_id: mentorData.id,
        members: [
          { user_id: mentorData.id, role: "admin" },
          { user_id: studentData.id, role: "user" },
        ],
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
  } catch (error) {
    console.error("Error creating video call session:", error);
    throw new ApiError(500, "Failed to create video call session");
  }
};

export const generateUserCallToken = (userId: string) => {
  try {
    return client.generateUserToken({ user_id: userId });
  } catch (error) {
    console.error("Error generating user call token:", error);
    throw new ApiError(500, "Failed to generate user call token");
  }
};

export const endSession = async (callId: string) => {
  try {
    const call = client.video.call("default", callId);
    await call.end();
    return true;
  } catch (error) {
    console.error("Error ending video call session:", error);
    throw new ApiError(500, "Failed to end video call session");
  }
};

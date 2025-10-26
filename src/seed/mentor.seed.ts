import User from "../models/user.model";
import { connectDB, disconnectDB } from "../configs/database";

const mentorSeedData = [
  {
    name: "Sarah Johnson",
    username: "sarahjohnson_dev",
    email: "sarah.johnson@example.com",
    workingAt: "Google",
    yearsOfExperience: 8,
    profile:
      "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=400&h=400&fit=crop&crop=face",
    bio: "Senior Software Engineer at Google with expertise in React, Node.js, and cloud architecture. Passionate about mentoring junior developers and building scalable web applications.",
    skills: [
      "React",
      "Node.js",
      "TypeScript",
      "AWS",
      "System Design",
      "MongoDB",
    ],
    role: "mentor" as const,
    onBoarded: true,
  },
  {
    name: "Michael Chen",
    username: "michaelchen_ai",
    email: "michael.chen@example.com",
    workingAt: "Microsoft",
    yearsOfExperience: 12,
    profile:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    bio: "Principal AI Engineer at Microsoft Azure. Leading machine learning initiatives and mentoring teams on AI/ML best practices. Expert in Python, TensorFlow, and cloud ML services.",
    skills: [
      "Python",
      "Machine Learning",
      "TensorFlow",
      "Azure",
      "Data Science",
      "Deep Learning",
    ],
    role: "mentor" as const,
    onBoarded: true,
  },
  {
    name: "Emily Rodriguez",
    username: "emilyrodriguez_ux",
    email: "emily.rodriguez@example.com",
    workingAt: "Adobe",
    yearsOfExperience: 6,
    profile:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
    bio: "Senior UX Designer at Adobe with a focus on user-centered design and design systems. Experienced in creating intuitive interfaces for complex applications.",
    skills: [
      "UI/UX",
      "Figma",
      "Design Systems",
      "User Research",
      "Prototyping",
      "Adobe Creative Suite",
    ],
    role: "mentor" as const,
    onBoarded: true,
  },
  {
    name: "David Kumar",
    username: "davidkumar_devops",
    email: "david.kumar@example.com",
    workingAt: "Amazon",
    yearsOfExperience: 10,
    profile:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    bio: "DevOps Engineer at Amazon Web Services. Specializing in cloud infrastructure, CI/CD pipelines, and containerization. Helping teams build reliable and scalable systems.",
    skills: ["AWS", "Docker", "Kubernetes", "Terraform", "CI/CD", "Linux"],
    role: "mentor" as const,
    onBoarded: true,
  },
  {
    name: "Jessica Park",
    username: "jessicapark_data",
    email: "jessica.park@example.com",
    workingAt: "Netflix",
    yearsOfExperience: 7,
    profile:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face",
    bio: "Data Scientist at Netflix working on recommendation algorithms and user behavior analysis. Passionate about turning data into actionable insights.",
    skills: [
      "Python",
      "Data Science",
      "SQL",
      "Machine Learning",
      "Statistics",
      "Tableau",
    ],
    role: "mentor" as const,
    onBoarded: true,
  },
  {
    name: "Robert Williams",
    username: "robertwilliams_mobile",
    email: "robert.williams@example.com",
    workingAt: "Apple",
    yearsOfExperience: 9,
    profile:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
    bio: "iOS Developer at Apple with extensive experience in Swift and mobile app architecture. Leading development of consumer-facing applications with millions of users.",
    skills: [
      "Swift",
      "iOS Development",
      "Xcode",
      "Core Data",
      "SwiftUI",
      "App Store Optimization",
    ],
    role: "mentor" as const,
    onBoarded: true,
  },
  {
    name: "Lisa Thompson",
    username: "lisathompson_product",
    email: "lisa.thompson@example.com",
    workingAt: "Meta",
    yearsOfExperience: 5,
    profile:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop&crop=face",
    bio: "Product Manager at Meta focusing on social commerce initiatives. Expert in product strategy, user research, and cross-functional team leadership.",
    skills: [
      "Product Management",
      "Strategy",
      "Analytics",
      "User Research",
      "Agile",
      "SQL",
    ],
    role: "mentor" as const,
    onBoarded: true,
  },
  {
    name: "James Anderson",
    username: "jamesanderson_security",
    email: "james.anderson@example.com",
    workingAt: "CrowdStrike",
    yearsOfExperience: 11,
    profile:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=face",
    bio: "Cybersecurity Specialist at CrowdStrike with expertise in threat detection and incident response. Helping organizations build robust security frameworks.",
    skills: [
      "Cybersecurity",
      "Network Security",
      "Incident Response",
      "Python",
      "Linux",
      "SIEM",
    ],
    role: "mentor" as const,
    onBoarded: true,
  },
  {
    name: "Maria Garcia",
    username: "mariagarcia_fullstack",
    email: "maria.garcia@example.com",
    workingAt: "Stripe",
    yearsOfExperience: 6,
    profile:
      "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=400&h=400&fit=crop&crop=face",
    bio: "Full-stack Developer at Stripe working on payment infrastructure. Experienced in building secure, scalable financial applications with modern web technologies.",
    skills: [
      "JavaScript",
      "React",
      "Node.js",
      "PostgreSQL",
      "API Design",
      "Payment Systems",
    ],
    role: "mentor" as const,
    onBoarded: true,
  },
  {
    name: "Alex Thompson",
    username: "alexthompson_startup",
    email: "alex.thompson@example.com",
    workingAt: "Freelancer",
    yearsOfExperience: 4,
    profile:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop&crop=face",
    bio: "Freelance consultant and startup advisor with experience in scaling early-stage companies. Specializing in technical leadership and product development.",
    skills: [
      "Startup Strategy",
      "Technical Leadership",
      "React",
      "TypeScript",
      "Team Building",
      "Fundraising",
    ],
    role: "mentor" as const,
    onBoarded: true,
  },
];

const seedMentors = async (): Promise<void> => {
  try {
    console.log("🌱 Starting mentor seeding...");

    // Connect to database
    await connectDB();

    // Clear existing mentors (optional - remove if you want to keep existing data)
    await User.deleteMany({ role: "mentor" });
    console.log("🗑️  Cleared existing mentor data");

    // Insert mentor seed data
    const createdMentors = await User.insertMany(mentorSeedData);
    console.log(`✅ Successfully seeded ${createdMentors.length} mentors`);

    // Log created mentors
    createdMentors.forEach((mentor, index) => {
      console.log(
        `${index + 1}. ${mentor.name} (${mentor.username}) - ${
          mentor.workingAt
        }`
      );
    });
  } catch (error) {
    console.error("❌ Error seeding mentors:", error);
    throw error;
  } finally {
    // Disconnect from database
    await disconnectDB();
    console.log("🔌 Database connection closed");
  }
};

// Export for use in other files
export { mentorSeedData, seedMentors };

// Run seeding if this file is executed directly
if (require.main === module) {
  seedMentors()
    .then(() => {
      console.log("🎉 Mentor seeding completed successfully!");
      process.exit(0);
    })
    .catch((error) => {
      console.error("💥 Mentor seeding failed:", error);
      process.exit(1);
    });
}

import User from "../models/user.model";
import { connectDB, disconnectDB } from "../configs/database";

const studentSeedData = [
  {
    name: "Emma Wilson",
    username: "emmawilson_student",
    email: "emma.wilson@student.com",
    profile:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=400&fit=crop&crop=face",
    bio: "Computer Science student passionate about web development. Currently learning React and Node.js. Looking for mentorship in full-stack development.",
    skills: ["JavaScript", "React", "HTML/CSS", "Git"],
    role: "student" as const,
    onBoarded: true,
  },
  {
    name: "Ryan Martinez",
    username: "ryanmartinez_cs",
    email: "ryan.martinez@student.com",
    profile:
      "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=400&h=400&fit=crop&crop=face",
    bio: "Final year CS student interested in machine learning and AI. Working on personal projects involving Python and TensorFlow. Seeking guidance from ML experts.",
    skills: ["Python", "Machine Learning", "TensorFlow", "Data Analysis"],
    role: "student" as const,
    onBoarded: true,
  },
  {
    name: "Sophia Lee",
    username: "sophialee_design",
    email: "sophia.lee@student.com",
    profile:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=face",
    bio: "Design student transitioning into UX/UI design. Learning Figma and design principles. Looking for mentorship in user experience design and career guidance.",
    skills: ["UI/UX", "Figma", "Adobe Creative Suite", "Prototyping"],
    role: "student" as const,
    onBoarded: true,
  },
  {
    name: "Kevin Zhang",
    username: "kevinzhang_mobile",
    email: "kevin.zhang@student.com",
    profile:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=face",
    bio: "Self-taught mobile app developer learning iOS development. Building apps with Swift and SwiftUI. Seeking mentorship in mobile app architecture and best practices.",
    skills: ["Swift", "iOS Development", "SwiftUI", "Xcode"],
    role: "student" as const,
    onBoarded: true,
  },
  {
    name: "Isabella Rodriguez",
    username: "isabellar_data",
    email: "isabella.rodriguez@student.com",
    profile:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face",
    bio: "Mathematics student exploring data science and analytics. Learning Python, SQL, and statistical analysis. Looking for guidance in transitioning to a data science career.",
    skills: ["Python", "SQL", "Data Science", "Statistics"],
    role: "student" as const,
    onBoarded: true,
  },
  {
    name: "Marcus Johnson",
    username: "marcusjohnson_backend",
    email: "marcus.johnson@student.com",
    profile:
      "https://images.unsplash.com/photo-1531891570158-e71b35a95d54?w=400&h=400&fit=crop&crop=face",
    bio: "Backend developer learning Node.js and database design. Interested in building scalable APIs and microservices. Seeking mentorship in system design and architecture.",
    skills: ["Node.js", "JavaScript", "MongoDB", "API Design"],
    role: "student" as const,
    onBoarded: true,
  },
  {
    name: "Chloe Kim",
    username: "chloekim_frontend",
    email: "chloe.kim@student.com",
    profile:
      "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=400&h=400&fit=crop&crop=face",
    bio: "Frontend developer passionate about creating beautiful user interfaces. Learning React and TypeScript. Looking for mentorship in modern frontend development practices.",
    skills: ["React", "TypeScript", "CSS", "JavaScript"],
    role: "student" as const,
    onBoarded: true,
  },
  {
    name: "Daniel Brown",
    username: "danielbrown_devops",
    email: "daniel.brown@student.com",
    profile:
      "https://images.unsplash.com/photo-1463453091185-61582044d556?w=400&h=400&fit=crop&crop=face",
    bio: "IT student interested in DevOps and cloud computing. Learning Docker, Kubernetes, and AWS. Seeking guidance in building reliable deployment pipelines.",
    skills: ["Docker", "AWS", "Linux", "CI/CD"],
    role: "student" as const,
    onBoarded: true,
  },
  {
    name: "Olivia Taylor",
    username: "oliviataylor_security",
    email: "olivia.taylor@student.com",
    profile:
      "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&h=400&fit=crop&crop=face",
    bio: "Cybersecurity student learning ethical hacking and network security. Interested in penetration testing and security analysis. Looking for mentorship in cybersecurity career paths.",
    skills: ["Cybersecurity", "Network Security", "Python", "Linux"],
    role: "student" as const,
    onBoarded: true,
  },
  {
    name: "Ethan Davis",
    username: "ethandavis_fullstack",
    email: "ethan.davis@student.com",
    profile:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    bio: "Full-stack developer learning the MERN stack. Building personal projects and contributing to open source. Seeking mentorship in best practices and career development.",
    skills: ["React", "Node.js", "MongoDB", "JavaScript"],
    role: "student" as const,
    onBoarded: true,
  },
  {
    name: "Ava Wilson",
    username: "avawilson_product",
    email: "ava.wilson@student.com",
    profile:
      "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=400&fit=crop&crop=face",
    bio: "Business student interested in product management. Learning about user research, analytics, and product strategy. Looking for mentorship in transitioning to tech PM roles.",
    skills: ["Product Management", "Analytics", "User Research", "Strategy"],
    role: "student" as const,
    onBoarded: true,
  },
  {
    name: "Noah Garcia",
    username: "noahgarcia_game",
    email: "noah.garcia@student.com",
    profile:
      "https://images.unsplash.com/photo-1543132220-4bf3de6e10ae?w=400&h=400&fit=crop&crop=face",
    bio: "Game development enthusiast learning Unity and C#. Creating indie games and learning about game design principles. Seeking mentorship in game development industry.",
    skills: ["Unity", "C#", "Game Development", "3D Modeling"],
    role: "student" as const,
    onBoarded: true,
  },
  {
    name: "Grace Chen",
    username: "gracechen_ai",
    email: "grace.chen@student.com",
    profile:
      "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=400&h=400&fit=crop&crop=face",
    bio: "AI enthusiast studying deep learning and neural networks. Working on computer vision projects. Looking for mentorship in AI research and industry applications.",
    skills: ["Python", "Deep Learning", "Computer Vision", "TensorFlow"],
    role: "student" as const,
    onBoarded: true,
  },
  {
    name: "Logan Anderson",
    username: "logananderson_blockchain",
    email: "logan.anderson@student.com",
    profile:
      "https://images.unsplash.com/photo-1602952739908-e0c85462e4b5?w=400&h=400&fit=crop&crop=face",
    bio: "Blockchain developer learning Solidity and smart contract development. Interested in DeFi and Web3 technologies. Seeking mentorship in blockchain development.",
    skills: ["Blockchain", "Solidity", "Web3", "JavaScript"],
    role: "student" as const,
    onBoarded: true,
  },
  {
    name: "Zoe Martinez",
    username: "zoemartinez_startup",
    email: "zoe.martinez@student.com",
    profile:
      "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=400&h=400&fit=crop&crop=face",
    bio: "Entrepreneurial student working on a tech startup. Learning about business development, fundraising, and team building. Looking for mentorship in startup ecosystem.",
    skills: [
      "Startup Strategy",
      "Business Development",
      "Marketing",
      "Leadership",
    ],
    role: "student" as const,
    onBoarded: true,
  },
];

const seedStudents = async (): Promise<void> => {
  try {
    console.log("🌱 Starting student seeding...");

    // Connect to database
    await connectDB();

    // Clear existing students (optional - remove if you want to keep existing data)
    await User.deleteMany({ role: "student" });
    console.log("🗑️  Cleared existing student data");

    // Insert student seed data
    const createdStudents = await User.insertMany(studentSeedData);
    console.log(`✅ Successfully seeded ${createdStudents.length} students`);

    // Log created students
    createdStudents.forEach((student, index) => {
      console.log(
        `${index + 1}. ${student.name} (${
          student.username
        }) - Interested in: ${student.skills.slice(0, 3).join(", ")}`
      );
    });
  } catch (error) {
    console.error("❌ Error seeding students:", error);
    throw error;
  } finally {
    // Disconnect from database
    await disconnectDB();
    console.log("🔌 Database connection closed");
  }
};

// Export for use in other files
export { studentSeedData, seedStudents };

// Run seeding if this file is executed directly
if (require.main === module) {
  seedStudents()
    .then(() => {
      console.log("🎉 Student seeding completed successfully!");
      process.exit(0);
    })
    .catch((error) => {
      console.error("💥 Student seeding failed:", error);
      process.exit(1);
    });
}

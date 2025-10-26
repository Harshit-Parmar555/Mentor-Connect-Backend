import { seedMentors } from "./mentor.seed";
import { seedStudents } from "./student.seed";

const seedAllUsers = async (): Promise<void> => {
  try {
    console.log("🚀 Starting complete user seeding process...");

    // Seed mentors
    console.log("\n📚 Seeding mentors...");
    await seedMentors();

    // Seed students
    console.log("\n🎓 Seeding students...");
    await seedStudents();

    console.log("\n🎉 All users seeded successfully!");
  } catch (error) {
    console.error("❌ Error in complete seeding process:", error);
    throw error;
  }
};

// Export for use in other files
export { seedAllUsers };

// Run seeding if this file is executed directly
if (require.main === module) {
  seedAllUsers()
    .then(() => {
      console.log("✨ Complete seeding process finished!");
      process.exit(0);
    })
    .catch((error) => {
      console.error("💥 Complete seeding process failed:", error);
      process.exit(1);
    });
}

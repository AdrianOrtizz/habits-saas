import { CompletionModel } from "../models/completion.model";
import mongoose from "mongoose";
import { env } from "../config/env";

const MONGO_URI = env.MONGO_URI;

const USER_ID = "699f0af38f73bf10bf0802f1";
const DAILY_HABIT_ID = "69b04210e5fd0429d8d0bce9";
const WEEKLY_HABIT_ID = "69b04203e5fd0429d8d0bce7";

const seedData = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("📡 Conectado a la DB...");

    await CompletionModel.deleteMany({
      habitId: { $in: [DAILY_HABIT_ID, WEEKLY_HABIT_ID] },
    });

    const completions = [];
    const now = new Date();

    for (let i = 0; i < 21; i++) {
      const date = new Date();
      date.setDate(now.getDate() - i);
      completions.push({
        userId: USER_ID,
        habitId: DAILY_HABIT_ID,
        periodKey: date.toISOString().split("T")[0],
      });
    }

    const weeks = ["2026-W11", "2026-W10", "2026-W09"];
    weeks.forEach((weekKey) => {
      for (let slot = 1; slot <= 3; slot++) {
        completions.push({
          userId: USER_ID,
          habitId: WEEKLY_HABIT_ID,
          periodKey: `${weekKey}-${slot}`,
        });
      }
    });

    await CompletionModel.insertMany(completions);
    console.log(
      "✅ Inyección exitosa. Ahora pedí el /dashboard desde Postman con tu JWT.",
    );
  } catch (error) {
    console.error("❌ Error:", error);
  } finally {
    await mongoose.disconnect();
  }
};

seedData();

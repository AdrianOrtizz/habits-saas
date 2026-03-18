export const dashboardMock = {
  week: {
    start: "2026-03-16",
    end: "2026-03-23",
  },
  summary: {
    totalSteps: 10,
    completedSteps: 0,
    progressPercentage: 0,
  },
  habits: [
    {
      id: "69b04203e5fd12310429d8d0bce7",
      name: "Meditar 30 minutos",
      //   icon: "smile",
      frequency: {
        type: "weekly_times",
        timesPerWeek: 3,
        daysOfWeek: [],
      },
      streak: 3,
      progress: {
        completed: 0,
        target: 3,
      },
      steps: [
        {
          status: "pending",
          label: "1",
        },
        {
          status: "pending",
          label: "2",
        },
        {
          status: "pending",
          label: "3",
        },
      ],
    },
    {
      id: "69b04210e5awdadawfd0429d8d0bce9",
      name: "Leer 20 minutos",
      //   icon: "book-open",
      frequency: {
        type: "daily",
        daysOfWeek: [],
        timesPerWeek: 7,
      },
      streak: 5,
      progress: {
        completed: 0,
        target: 7,
      },
      steps: [
        {
          status: "missed",
          label: "Lun",
        },
        {
          status: "missed",
          label: "Mar",
        },
        {
          status: "done",
          label: "Mié",
        },
        {
          status: "pending",
          label: "Jue",
        },
        {
          status: "pending",
          label: "Vie",
        },
        {
          status: "pending",
          label: "Sáb",
        },
        {
          status: "pending",
          label: "Dom",
        },
      ],
    },
    {
      id: "69b04210e5fd0429asdad8d0bce9",
      name: "Hacer ejercicio",
      //   icon: "biceps-flexed",
      frequency: {
        type: "daily",
        daysOfWeek: [],
        timesPerWeek: 7,
      },
      streak: 10,
      progress: {
        completed: 0,
        target: 7,
      },
      steps: [
        {
          status: "missed",
          label: "Lun",
        },
        {
          status: "missed",
          label: "Mar",
        },
        {
          status: "pending",
          label: "Mié",
        },
        {
          status: "pending",
          label: "Jue",
        },
        {
          status: "pending",
          label: "Vie",
        },
        {
          status: "pending",
          label: "Sáb",
        },
        {
          status: "pending",
          label: "Dom",
        },
      ],
    },
    {
      id: "69b04211242150e5fd0429d8d0bce9",
      name: "Tomar Agua",
      //   icon: "glass-water",
      frequency: {
        type: "daily",
        daysOfWeek: [],
        timesPerWeek: 7,
      },
      streak: 0,
      progress: {
        completed: 0,
        target: 7,
      },
      steps: [
        {
          status: "missed",
          label: "Lun",
        },
        {
          status: "missed",
          label: "Mar",
        },
        {
          status: "pending",
          label: "Mié",
        },
        {
          status: "pending",
          label: "Jue",
        },
        {
          status: "pending",
          label: "Vie",
        },
        {
          status: "pending",
          label: "Sáb",
        },
        {
          status: "pending",
          label: "Dom",
        },
      ],
    },
  ],
};

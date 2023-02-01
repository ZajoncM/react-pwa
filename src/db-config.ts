export const DBConfig = {
  name: "db",
  version: 1,
  objectStoresMeta: [
    {
      store: "notes",
      storeConfig: { keyPath: "id", autoIncrement: true },
      storeSchema: [
        { name: "title", keypath: "title", options: { unique: false } },
        {
          name: "description",
          keypath: "description",
          options: { unique: false },
        },
      ],
    },
  ],
};

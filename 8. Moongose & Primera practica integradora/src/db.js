import mongoose from "mongoose";

// Configuración de la conexión a la base de datos
const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://ezequieldureit:ChKf1MXeRxz6ajz3@cluster0-ezequieldure.vjcwgnh.mongodb.net/CoderHouseBackend",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("Conexión exitosa a la base de datos");
  } catch (error) {
    console.error("Error al conectar a la base de datos:", error.message);
    process.exit(1); // Salir del proceso con código de error
  }
};

export default connectDB;

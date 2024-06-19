const supabase = require("../config/supabase");
const bcrypt = require("bcrypt");

const saveUserInDb = async ({ name, email, password }) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const { data: user, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (signUpError) {
      console.error("Error en signUp:", signUpError.message);
      throw new Error(signUpError.message);
    }
    const { data, error: insertError } = await supabase
      .from("users")
      .insert([{ id: user.user.id, name, email, password: hashedPassword }]);

    if (insertError) {
      console.error(
        "Error al insertar en la tabla users:",
        insertError.message
      );
      throw new Error(insertError.message);
    }

    return { user, data };
  } catch (err) {
    console.error("Error en saveUserInDb:", err.message);
    throw err;
  }
};

const loginUser = async ({ email, password }) => {
  try {
    const { data: signInData, error: signInError } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    if (signInError) {
      console.error("Error en signIn:", signInError.message);
      throw new Error(signInError.message);
    }

    const { data: userRecord, error: selectError } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .single();

    if (selectError) {
      console.error("Error al seleccionar el usuario:", selectError.message);
      throw new Error(selectError.message);
    }

    if (!userRecord || !(await bcrypt.compare(password, userRecord.password))) {
      console.error("Credenciales inválidas");
      throw new Error("Credenciales inválidas");
    }

    return signInData;
  } catch (err) {
    console.error("Error en loginUser:", err.message);
    throw err;
  }
};

module.exports = { saveUserInDb, loginUser };

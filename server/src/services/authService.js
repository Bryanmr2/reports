const supabase = require("../config");
const bcrypt = require("bcrypt");

const saveUserInDb = async ({ name, email, password }) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const { user, error } = await supabase.auth.signUp({
    email,
    password: hashedPassword,
  });

  if (error) {
    throw new Error(error.message);
  }

  const { data, error: insertError } = await supabase
    .from("users")
    .insert([{ id: user.id, name, email, password: hashedPassword }]);

  if (insertError) {
    throw new Error(insertError.message);
  }

  return { user, data };
};

const loginUser = async ({ email, password }) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  const userRecord = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .single();

  if (
    !userRecord.data ||
    !(await bcrypt.compare(password, userRecord.data.password))
  ) {
    throw new Error("Credenciales inválidas");
  }

  return data;
};

module.exports = { saveUserInDb, loginUser };

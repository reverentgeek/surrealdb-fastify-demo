const url = process.env.SURREAL_URL || "http://127.0.0.1:8000/rpc";
const namespace = process.env.SURREAL_NAMESPACE || "test";
const database = process.env.SURREAL_DATABASE || "test";
const username = process.env.SURREAL_USER;
const password = process.env.SURREAL_PASS;

const config = {
  url,
  namespace,
  database,
  username,
  password
};

export default config;

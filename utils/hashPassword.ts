import bcrypt from "bcrypt";

const hashPassword = async (password: string): Promise<string> => {
	const hash = await bcrypt.hash(password, 10);
	return hash;
};

export default hashPassword;

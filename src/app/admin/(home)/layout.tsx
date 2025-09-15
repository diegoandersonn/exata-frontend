import "../../globals.css";
import { cookies } from "next/headers";
import RootLayout from "./layoutWrapper";
import { IUser } from "@/types/user.type";
import { redirect } from "next/navigation";

export default async function RootLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = cookies();
  const token = (await cookieStore).get("token")?.value;
  let id = "";
  let user: IUser | undefined;

  if (token) {
    try {
      const response = await fetch(`http://localhost:3333/auth/me`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      });

      const { data } = await response.json();
      id = data.id;
      user = data as IUser;
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
  }

  if (!token) {
    redirect("/admin");
  }

  return (
    <RootLayout token={token || ""} id={id} user={user}>
      {children}
    </RootLayout>
  );
}

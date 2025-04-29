import { drizzle } from "drizzle-orm/expo-sqlite";
import { eq } from "drizzle-orm";
import { openDatabaseSync } from "expo-sqlite";
import { usuarioTable, ccpsListTable, DATABASE_NAME } from "../database/schema";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ccps } from "../models/Ccps";

// Conexão com o banco de dados
const DZSQLiteConnect = (dbname: string = DATABASE_NAME) => {
  const db = openDatabaseSync(dbname);
  return drizzle(db);
};

export type Usuario = {
  id: string;
  nome: string;
  cpf?: string | null;
  crmv?: string | null;
  data_nascimento?: string | null;
  email: string;
  senha: string;
  telefone?: string | null;
  tipo_usuario: "VETERINARIO" | "MAPA";
  ccpsList: Ccps[];
};

// Função para buscar a lista de CCPS associada ao usuário
async function buscarCcpsList(usuarioId: string): Promise<Ccps[]> {
  const conn = DZSQLiteConnect();
  
  const id = Number(usuarioId); // Corrige o tipo para number

  const ccpsRaw = await conn
    .select()
    .from(ccpsListTable)
    .where(eq(ccpsListTable.usuarioId, id)) // Usa o número, como o banco espera
    .all();

  return ccpsRaw
    .filter((ccps) => ccps.ccpsData !== null)
    .map((ccps) => JSON.parse(ccps.ccpsData as string));
}



// Função de login
export async function login(email: string, senha: string): Promise<Usuario | null> {
  const conn = DZSQLiteConnect();

  const usuario = await conn
    .select()
    .from(usuarioTable)
    .where(eq(usuarioTable.email, email))
    .limit(1)
    .all();

  if (usuario.length > 0 && usuario[0].senha === senha) {
    const ccpsList = await buscarCcpsList(usuario[0].id);

    const usuarioCompleto: Usuario = {
      id: usuario[0].id,
      nome: usuario[0].nome,
      cpf: usuario[0].cpf,
      crmv: usuario[0].crmv,
      data_nascimento: usuario[0].dataNascimento,
      email: usuario[0].email,
      senha: usuario[0].senha,
      telefone: usuario[0].telefone,
      tipo_usuario: usuario[0].tipoUsuario as "VETERINARIO" | "MAPA",
      ccpsList: ccpsList || [],
    };

    await saveUsuarioLogado(usuarioCompleto.id);
    return usuarioCompleto;
  }

  return null;
}

// Salvar ID do usuário logado
async function saveUsuarioLogado(id: string) {
  await AsyncStorage.setItem("@usuario_logado", id);
}

// Buscar usuário logado
export async function getUsuarioLogado(): Promise<Usuario | null> {
  const conn = DZSQLiteConnect();
  const id = await AsyncStorage.getItem("@usuario_logado");

  if (!id) return null;

  const usuario = await conn
    .select()
    .from(usuarioTable)
    .where(eq(usuarioTable.id, id))
    .limit(1)
    .all();

  if (usuario.length > 0) {
    const ccpsList = await buscarCcpsList(usuario[0].id);

    return {
      id: usuario[0].id,
      nome: usuario[0].nome,
      cpf: usuario[0].cpf,
      crmv: usuario[0].crmv,
      data_nascimento: usuario[0].dataNascimento,
      email: usuario[0].email,
      senha: usuario[0].senha,
      telefone: usuario[0].telefone,
      tipo_usuario: usuario[0].tipoUsuario as "VETERINARIO" | "MAPA",
      ccpsList: ccpsList || [],
    };
  }

  return null;
}

// Função de logout
export async function logout() {
  await AsyncStorage.removeItem("@usuario_logado");
}

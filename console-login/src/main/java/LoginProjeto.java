import java.util.Scanner;

public class LoginProjeto {
    public static void main(String[] args) {
        System.out.println("Digite seu nome de usuário: ");
        Scanner leitor = new Scanner(System.in);
        String nomeUsuario = leitor.nextLine();

        System.out.println("Digite sua senha: ");
        Scanner leitor2 = new Scanner(System.in);
        String senha = leitor2.nextLine();

        String nomeUsuarioAdmin = "Garcia";
        String senhaAdmin = "1234";

        if(nomeUsuario.equals(nomeUsuarioAdmin) && senha.equals(senhaAdmin)){
            System.out.println("Seja bem-vindo!");
        } else {
            System.out.println("Usuário ou senha inválido(a)!");
        }
    }
};

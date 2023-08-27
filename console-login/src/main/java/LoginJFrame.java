import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

public class LoginGUI {
    public static void main(String[] args) {
        SwingUtilities.invokeLater(() -> {
            JFrame frame = new JFrame("Login");
            frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);

            JPanel panel = new JPanel();
            panel.setLayout(new GridLayout(7, 5));

            JLabel userLabel = new JLabel("Usuário:");
            JTextField userField = new JTextField();

            JLabel passwordLabel = new JLabel("Senha:");
            JPasswordField passwordField = new JPasswordField();

            JButton loginButton = new JButton("Login");
            JLabel resultLabel = new JLabel();

            panel.add(userLabel);
            panel.add(userField);
            panel.add(passwordLabel);
            panel.add(passwordField);
            panel.add(new JLabel());
            panel.add(loginButton);

            loginButton.addActionListener(new ActionListener() {
                @Override
                public void actionPerformed(ActionEvent e) {
                    String username = userField.getText();
                    String password = new String(passwordField.getPassword());

                    String loginAdmin = "Garcia";
                    String senhaAdmin = "1234";

                    if (username.equals(loginAdmin) && password.equals(senhaAdmin)) {
                        resultLabel.setText("Logado com sucesso!");
                    } else {
                        resultLabel.setText("Erro de login!");
                    }
                }
            });

            frame.add(panel, BorderLayout.CENTER);
            frame.add(resultLabel, BorderLayout.SOUTH);

            frame.pack();
            frame.setVisible(true);
        });
    }
}

import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

public class LoginJFrame {
    public static void main(String[] args) {
        SwingUtilities.invokeLater(() -> {
            JFrame frame = new JFrame("Login");
            frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);

            JPanel mainPanel = new JPanel(new GridBagLayout());
            GridBagConstraints constraints = new GridBagConstraints();
            constraints.insets = new Insets(10, 10, 10, 10);

            JPanel panel = new JPanel(new GridLayout(3, 3));

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
            panel.add(new JLabel()); // Espaço vazio, para espaçamento
            panel.add(loginButton);

            loginButton.addActionListener(new ActionListener() {
                @Override
                public void actionPerformed(ActionEvent e) {
                    String username = userField.getText();
                    String password = new String(passwordField.getPassword());

                    String adminUsername = "Garcia";
                    String adminPassword = "1234";

                    if (username.equals(adminUsername) && password.equals(adminPassword)) {
                        resultLabel.setText("Logado com sucesso!");
                    } else {
                        resultLabel.setText("Erro de login!");
                    }
                }
            });

            constraints.gridx = 0;
            constraints.gridy = 0;
            mainPanel.add(panel, constraints);

            constraints.gridx = 0;
            constraints.gridy = 1;
            mainPanel.add(resultLabel, constraints);

            frame.add(mainPanel);
            frame.pack();
            frame.setLocationRelativeTo(null); // Centro da tela
            frame.setVisible(true);
        });
    }
}

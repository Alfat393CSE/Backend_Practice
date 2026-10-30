import Mailgen from "mailgen";

const emailVerificationMailgenContent = (username, verificationUrl) => {
  return {
    body: {
      name: username,
      intro: "Welcome to the app! We're very excited to have you on board.",
      action: {
        instructions: "To get started with the app, please click here:",
        button: {
          color: "#22BC66", // Optional action button color
          text: "Verify your email",
          link: verificationUrl,
        },
      },
      outro:
        "Need help, or have questions? Just reply to this email, we'd love to help.",
    },
  };
};

const forgotPasswordMailgenContent = (username, resetPasswordUrl) => {
  return {
    body: {
      name: username,
      intro: "Reset your password.",
      action: {
        instructions: "To reset your password, please click here:",
        button: {
          color: "#22BC66", // Optional action button color
          text: "Reset your password",
          link: resetPasswordUrl,
        },
      },
      outro:
        "Need help, or have questions? Just reply to this email, we'd love to help.",
    },
  };
};

export { emailVerificationMailgenContent, forgotPasswordMailgenContent };

import React from "react";
import { Box, Typography } from "@mui/material";

const Welcome = () => {
  return (
    <Box textAlign="center" mt={2} border="4px solid #000" borderRadius={8} p={4}>
      <Typography variant="h2" mb={4}>
        <span style={{ textDecoration: "underline" }}>Welcome to Code-Judge</span>
      </Typography>
      <Typography variant="h5" mb={4}>
        Code-Judge is a coding platform where you can solve programming problems
        and improve your coding skills. Whether you are a beginner learning to code or an experienced developer looking to practice, Code-Judge provides a range of coding challenges to help you enhance your problem-solving abilities.
      </Typography>
      <Typography variant="h5" mb={4}>
        With Code-Judge, you can explore different programming concepts, algorithms, and data structures through hands-on coding exercises. The platform supports multiple programming languages, allowing you to choose the language you are most comfortable with or explore new languages.
      </Typography>
      <Typography variant="h5" mb={2}>
        To get started, <span style={{ textDecoration: "underline" }}>SIGN UP</span> if you don't have an account, otherwise, <span style={{ textDecoration: "underline" }}>LOGIN</span>:
      </Typography>
      <Typography variant="h5" mb={2}>Follow these instructions to add a new problem:</Typography>
      <ol style={{ textAlign: "left", fontSize: "1.2rem", maxWidth: "500px", margin: "0 auto" }}>
        <li>Click on the "Add Problem" button.</li>
        <li>Fill in the details of the problem, including the problem statement, sample inputs, and expected outputs.</li>
        <li>Click "Submit" to add the problem to the platform.</li>
        <li>Once the problem is added, you can solve it by clicking on the "Solve" button next to the problem title.</li>
      </ol>
      <Typography variant="h5" mt={4}>
        <span style={{ textDecoration: "underline" }}>Good luck and happy coding!</span>
      </Typography>
    </Box>
  );
};

export default Welcome;

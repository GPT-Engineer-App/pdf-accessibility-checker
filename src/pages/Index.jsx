import React, { useState } from "react";
import { Container, Text, VStack, Input, Button, Box, Heading, UnorderedList, ListItem } from "@chakra-ui/react";
import { FaFileUpload, FaCheck, FaTimes } from "react-icons/fa";

const Index = () => {
  const [file, setFile] = useState(null);
  const [issues, setIssues] = useState([]);
  const [accessibilityScore, setAccessibilityScore] = useState(0);
  const [isRemediated, setIsRemediated] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const checkAccessibility = async () => {
    const response = await new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          score: 75,
          issues: ["Missing alternative text for images", "Incorrect heading structure", "Lack of tagged PDF"],
        });
      }, 2000);
    });
    setIssues(response.issues);
    setAccessibilityScore(response.score);
  };

  const remediatePDF = () => {
    // Simulated remediation process
    setIsRemediated(true);
  };

  return (
    <Container maxW="container.md" py={8}>
      <VStack spacing={6} align="stretch">
        <Heading as="h1" size="xl">
          PDF Accessibility Checker and Remediation Tool
        </Heading>

        <Box>
          <Input type="file" accept=".pdf" onChange={handleFileChange} />
          <Button leftIcon={<FaFileUpload />} mt={4} colorScheme="blue" onClick={checkAccessibility} isDisabled={!file}>
            Check Accessibility
          </Button>
        </Box>

        <Box>
          <Heading as="h2" size="lg">
            Accessibility Score: {accessibilityScore}
          </Heading>
          {issues.length > 0 && (
            <Box>
              <Heading as="h3" size="md" mt={4}>
                Accessibility Issues:
              </Heading>
              <UnorderedList>
                {issues.map((issue, index) => (
                  <ListItem key={index}>
                    <Text as="span" color="red.500" mr={2}>
                      <FaTimes />
                    </Text>
                    {issue}
                  </ListItem>
                ))}
              </UnorderedList>
              <Button mt={4} colorScheme="green" onClick={remediatePDF}>
                Remediate PDF
              </Button>
            </Box>
          )}
        </Box>

        {isRemediated && (
          <Box>
            <Text color="green.500" fontSize="xl">
              <FaCheck /> PDF has been remediated for accessibility!
            </Text>
          </Box>
        )}
      </VStack>
    </Container>
  );
};

export default Index;

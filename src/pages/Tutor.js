import { Box, Button } from "@chakra-ui/react";
import React from "react";
import Lesson from "../components/Lesson/lesson";
import PageIntro from "../components/shared/intro";
import { useAuth } from "../contexts/AuthContext";
import { IoMdAdd } from "react-icons/io";
import LessonForm from "../components/Lesson/form";
import axios from "../axios/index";

export default function Tutor() {
  const [showForm, setShowForm] = React.useState(false);
  const [lessons, setLessons] = React.useState([]);
  const { user } = useAuth();
  const base_url = "https://pamoja-backend.onrender.com/api";
  // const base_url = "http://localhost:5000/api";

  // React.useEffect(() => {}, [showForm]);
  React.useEffect(() => {
    axios()
      .get(`${base_url}/lessons`)
      .then((res) => {
        setLessons(res.data);
      })
      .catch((error) => alert(error.response.data));
  }, [lessons, setLessons]);
  if (!user) {
    return;
  }

  return (
    <Box maxWidth={"1200px"} margin="40px auto" borderRadius="24px">
      <Box
        border="2px solid #3e92cc"
        marginTop="40px"
        padding={"50px"}
        fontSize="20px"
        background="#fff"
        borderRadius="20px"
      >
        <PageIntro user={user} cost={"30"} />{" "}
        {!showForm && (
          <Button
            leftIcon={<IoMdAdd size="24px" />}
            colorScheme="blue"
            variant="outline"
            onClick={() => setShowForm(!showForm)}
          >
            Book a lesson
          </Button>
        )}{" "}
        {showForm && (
          <Button
            colorScheme="blue"
            variant="outline"
            onClick={() => setShowForm(!showForm)}
          >
            Cancel
          </Button>
        )}
        {showForm && <LessonForm />}
      </Box>
      <Box
        background={"#fff"}
        mt="40px"
        borderRadius="20px"
        border="1px solid black"
      >
        {lessons
          .filter((lesson) => !lesson.isTaught)
          .map((lesson) => (
            <Lesson key={lesson._id} lesson={lesson} user={user} />
          ))}
      </Box>
    </Box>
  );
}

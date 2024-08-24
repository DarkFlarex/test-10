import './App.css'
import AppToolbar from "./UI/AppToolbar/AppToolbar";
import {Container, Typography} from "@mui/material";
import {Route, Routes} from "react-router-dom";
import News from "./features/news/News";
import AddNews from "./features/news/addNews";
import OneNews from "./features/news/OneNews";

const App = () => {

  return (
      <>
          <AppToolbar/>
          <Container maxWidth="xl" component="main">
              <Routes>
                  <Route path="/" element={<News />} />
                  <Route path="/news/:id" element={<OneNews />} />
                  <Route path="/news/addNews" element={<AddNews />} />
                  <Route path="*" element={<Typography variant="h1">Not found</Typography>} />
              </Routes>
          </Container>
      </>
  )
}

export default App

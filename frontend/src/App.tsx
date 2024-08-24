import './App.css'
import AppToolbar from "./UI/AppToolbar/AppToolbar.tsx";
import {Container, Typography} from "@mui/material";
import {Route, Routes} from "react-router-dom";
import News from "./features/news/components/News.tsx";

const App = () => {

  return (
      <>
          <AppToolbar/>
          <Container maxWidth="xl" component="main">
              <Routes>
                  <Route path="/" element={<News />} />
                  <Route path="*" element={<Typography variant="h1">Not found</Typography>} />
              </Routes>
          </Container>
      </>
  )
}

export default App

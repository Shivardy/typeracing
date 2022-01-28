import { SkeletonTheme } from "react-loading-skeleton";
import styled, { ThemeProvider } from "styled-components";
import TypeZone from "./components/TypeZone";
import { appContext } from "./services/AppContext";
import { getTheme, GlobalStyles } from "./styles/theme";

const Container = styled.div`
  display: flex;
  justify-content: space-around;
`;
const CenterContent = styled.div`
  max-width: 1200px;
  display: grid;
  grid-auto-flow: row;
  min-height: 100vh;
  padding: 2rem;
  padding: ${(props) => props.theme.size.xxxl};
  gap: ${(props) => props.theme.size.xxxl};
  align-items: center;
  width: 100%;
`;

function App() {
  const { isDarkMode } = appContext();
  const theme = getTheme(isDarkMode);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <SkeletonTheme
        color={theme.colors.surface2}
        highlightColor={theme.colors.surface1}
      >
        <Container>
          <CenterContent>
            <TypeZone />
          </CenterContent>
        </Container>
      </SkeletonTheme>
    </ThemeProvider>
  );
}

export default App;

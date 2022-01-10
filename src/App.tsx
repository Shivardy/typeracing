import { SkeletonTheme } from "react-loading-skeleton";
import styled, { ThemeProvider } from "styled-components";
import { appContext } from "./services/AppContext";
import { getTheme, GlobalStyles } from "./styles/theme";

const Container = styled.div`
  display: flex;
  justify-content: space-around;
`;
const CenterContent = styled.div`
  max-width: 1000px;
  display: grid;
  grid-auto-flow: row;
  min-height: 100vh;
  padding: 2rem;
  padding: ${(props) => props.theme.size.xxxl};
  gap: ${(props) => props.theme.size.xxxl};
  color: ${(props) => props.theme.colors.brand};
  align-items: center;
  grid-template-rows: auto 1fr auto;
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
            <h1>Shiva</h1>
          </CenterContent>
        </Container>
      </SkeletonTheme>
    </ThemeProvider>
  );
}

export default App;

import { FC, useEffect, useState } from 'react';
import { getFigmaFile } from '../services/figmaService';
import { setColorsTheme } from '../helpers/convert.helper';
import Loader from '../components/loader';
import DefaultLayout from '../layouts/default-layout';
import { Routes, Route } from 'react-router';
import HomeScreen from '../features/home/screens/home';
import AboutUsScreen from '../features/about-us/screens/about-us';

const FILE_ID = 'knUWAoukgMPYlu0YxRbEVb';

export const App: FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const file = await getFigmaFile(FILE_ID);
        const nodeColors = file.document.children.find(
          (item) => item.name === '↪ Colors'
        );

        if (nodeColors) {
          const colorsNode = nodeColors.children?.find(
            (item) => item.name === 'Colours'
          );
          if (colorsNode) {
            setColorsTheme(colorsNode);
          }
        }
      } catch (error) {
        console.error('Error fetching data from Figma:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <Routes>
      <Route element={<DefaultLayout />}>
        <Route index element={<HomeScreen />} />
        <Route path="about-us" element={<AboutUsScreen />} />
      </Route>
    </Routes>
  );
};

export default App;

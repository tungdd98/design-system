import { FC, useEffect, useState } from 'react';
import { getFigmaFile } from '../services/figmaService';
import { setColorsTheme } from '../helpers/convert.helper';
import { Button, Typography } from '@design-system/ui';
import Loader from '../components/loader/loader';

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
    <div className="container mx-auto">
      <div>Primary</div>
      <div className="flex flex-col gap-2 mb-4">
        <p className="text-primary-100">Primary 100</p>
        <p className="text-primary-200">Primary 200</p>
        <p className="text-primary-300">Primary 300</p>
        <p className="text-primary-400">Primary 400</p>
        <p className="text-primary-500">Primary 500</p>
        <p className="text-primary-600">Primary 600</p>
        <p className="text-primary-700">Primary 700</p>
        <p className="text-primary-800">Primary 800</p>
        <p className="text-primary-900">Primary 900</p>
      </div>
      <div>
        <Button>Button</Button>
      </div>
      <div className="font-medium">
        <Typography variant="h1">h1</Typography>
        <Typography variant="h2">h2</Typography>
        <Typography variant="h3">h3</Typography>
        <Typography variant="subtitle1">subtitle1</Typography>
        <Typography variant="subtitle2">subtitle2</Typography>
        <Typography variant="body1">body1</Typography>
        <Typography variant="body2">body2</Typography>
      </div>
    </div>
  );
};

export default App;

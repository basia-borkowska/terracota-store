import { useTranslation } from 'react-i18next';
import { Badge } from '../../shared/ui/atoms/badge';
import { Button } from '../../shared/ui/atoms/Button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../../shared/ui/atoms/card';

const Home = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-4 w-fit">
      {t('home.welcome')}
      <Button onClick={() => alert('Button clicked!')}>Click Me</Button>
      <Badge className="w-fit" variant="secondary">
        New
      </Badge>
      <Card>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Card Content</p>
        </CardContent>
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Home;

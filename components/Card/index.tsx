import * as React from 'react';
import{ Card as MUICard, Typography } from '@mui/material';
import CardContent from '@mui/material/CardContent';

interface Props {
  children: React.ReactNode;
  className?: string;
  title?: string
}

const Card = ({ className, children, title }: Props) => {
  return (
    <MUICard className={`${className} max-w-lg`}>
      <CardContent>
        {title &&
          <Typography gutterBottom variant="h5" component="div" className="mb-6">
            {title}
          </Typography>
        }
        {children}
      </CardContent>
    </MUICard>
  );
}

export default Card;
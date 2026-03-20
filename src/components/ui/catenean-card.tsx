import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  CardAction
} from '@/components/ui/card'

export type CatProps = {
  imageUrl: string;
  sex: 'male' | 'female';
  catName: string;
  location: string;
  catColor: ('gray' | 'black' | 'white' | 'darkBrown' | 'orange' | 'lightBrown' | 'warm_brown' | 'Driftwood' | 'sandyBrown')[];  // Array of colors
  healthStatus: string;
  medicine: string | null;
  personality: string;
  svgColor: 'black' | 'darkBrown' | 'lightBrown' | 'orange';  // Single color only
};

const COLOR_MAP = {
  gray:   '#70645C',
  black:  '#3A3A3A',
  white:  '#eee',
  darkBrown:  '#83491B',
  orange: '#E3981B',
  lightBrown: '#BF7900',
  warm_brown : '#826854',
  Driftwood: '#8D745D',
  sandyBrown : '#B39477'
};

function CateneanCard({ imageUrl, sex, catName, location, catColor, healthStatus, medicine, personality, svgColor }: CatProps) {
  return (
    <Card>  
       
    </Card>
  )
}

export default CateneanCard
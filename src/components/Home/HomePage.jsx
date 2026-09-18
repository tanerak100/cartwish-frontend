import React from 'react'
import HeroSection from './HeroSection'

import iphone from '../../assets/iphone-14-pro.webp'
import mac from '../../assets/mac-system-cut.jfif'
import FeaturedProducts from './FeaturedProducts'

const HomePage = () => {
  return (
    <div>
      {/*Hero Section */}
      <HeroSection 
      title='Buy iPhone 14 Pro'
      subtitle='Experience the power of the latest iPhone 14 with our most Pro camera ever.'
      link='/product/6aa6aece22e4b9838d1ff9c0'
      image={iphone}
      />

    <FeaturedProducts/>

      {/* Featured Products */}
       <HeroSection 
      title='Build the ultimate setup'
      subtitle='You can add Studio Display and colour-matched Magic accessories to your bag after configure your Mac mini'
      link='/product/6aa6aece22e4b9838d1ff9c8'
      image={mac}
      />
      {/* Hero Section */}
    </div>
  )
}

export default HomePage

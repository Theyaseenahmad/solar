import React from 'react'

const page = () => {
  return (
    <div className="w-full h-screen bg-[url('https://images.pexels.com/photos/2043739/pexels-photo-2043739.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')] bg-cover bg-center flex items-center justify-center text-white font-bold font-[gilroy]">


        <div id='box' className="w-[70%] h-[70%] rounded-lg shadow-xl flex flex-col gap-2 items-center justify-center  font-semibold 
               bg-white/10 backdrop-blur-md border border-white/50 p-6">

                <h2 className='font-bold text-xl text-left'>About Us :</h2>
            <div className='gap-2 flex flex-col'>LEHK is a solar-based startup in Madhya Pradesh committed to making renewable energy accessible and efficient. We specialize in providing high-quality solar electrical solutions for homes, businesses, and industries, helping customers transition to a greener and more cost-effective energy source.

<p>Our product range includes solar panels, inverters, batteries, water heaters, and street lights, along with customized solar solutions tailored to specific energy needs. Whether you are looking to power your home, business, or agricultural setup, we offer reliable and innovative solar technology designed for long-term benefits.</p>

<p>At LEHK, we focus on affordability, efficiency, and sustainability. Our expert team ensures seamless consultation, installation, and maintenance, making the switch to solar hassle-free. By choosing LEHK, you not only reduce electricity expenses but also contribute to a cleaner environment.

Join us in embracing solar energy and be a part of the movement towards a sustainable future. 🌞
</p>


</div>
        </div>
    </div>
  )
}

export default page
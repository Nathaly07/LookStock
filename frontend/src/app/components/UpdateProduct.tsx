'use cliente';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createProduct } from '../api/apiProducts';

interface Product {
    name: string;
    category: string;
    price: string;
    stock: number;
    image: string;
}

const UpdateProduct = () => {
    return(
        <div>
            Contenido
        </div>
    );
}

export default UpdateProduct;
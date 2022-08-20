import React from 'react';

export default function Paginado ({recipePerPage, allRecipes, paginado, currentPage, setCurrentPage}){
    const pageNumber= []
    let numPages= Math.ceil(allRecipes/recipePerPage)
    for(let i=1; i<= numPages; i++){
        pageNumber.push(i)
    }
    return(
        <nav>
            <ul>
                <button
                disabled= {currentPage === 1}
                onClick={()=>
                setCurrentPage(currentPage === 1?
                    currentPage:
                    currentPage - 1)}
                >
                Prev.
                </button>
                <li>
                    {pageNumber && pageNumber.map((number)=>(
                        <button
                        key={number}
                        onClick={()=>paginado(number)}
                        >
                        {number}
                        </button>
                    ))}
                </li>
                <button
                disabled={currentPage === pageNumber.length}
                onClick={()=>
                setCurrentPage(currentPage === numPages?
                    currentPage:
                    currentPage + 1)}
                >
                Sig.
                </button>
            </ul>
        </nav>
    )
}
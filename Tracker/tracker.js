document.addEventListener('DOMContentLoaded',()=>{
         const expenseform =document.getElementById("expense-form");

         const expensesnameInput  =document.getElementById("expenses-name");

         const expenseamountInput =document.getElementById("expense-amount");

         const expenselist =document.getElementById("expense-list");

         const total = document.getElementById("total");

         const totalamountdisplay = document.getElementById("total-amount");


         let expenses = JSON.parse(localStorage.getItem('expenses')) ||[];
         let totalAmount = calculatetotal();
            renderexpenses();
         expenseform.addEventListener('submit',(e)=>{
            e.preventDefault();
            const name = expensesnameInput.value.trim();
            const amount = parseFloat(expenseamountInput.value.trim());

            if(name !== "" && !isNaN(amount) && amount>0){
                const newExpense ={
                    id: Date.now(),
                    name,
                    amount
                      }
               expenses.push(newExpense);
               saveExpensestolocal();
               renderexpenses();
               updatetotal();

             }
             expensesnameInput.value ="";
             expenseamountInput.value = "";

 
         })

         function renderexpenses(){
            expenselist.innerHTML ="";
            expenses.forEach(expense =>{
                const li = document.createElement('li');
                li.innerHTML =`
                ${expense.name}-$${expense.amount}
                <button data-id ="${expense.id}" >Delete</button>`;
                 expenselist.appendChild(li);
                 updatetotal();
            });

         }

         function calculatetotal (){
            return expenses.reduce((sum , expense)=> sum + expense.amount,0);
     
           }

           function saveExpensestolocal (){
            localStorage.setItem("expenses",JSON.stringify(expenses));

           }

   function updatetotal (){
    totalAmount = calculatetotal();
    totalamountdisplay.textContent =  parseFloat(totalAmount.toFixed(2));
   }
   expenselist.addEventListener('click',(e)=> {
    if(e.target.tagName ==="BUTTON"){
        const expenseid = parseInt(e.target.getAttribute('data-id'));
        expenses = expenses.filter(expense => expense.id !== expenseid);
         saveExpensestolocal();
         renderexpenses();
            updatetotal();
    }
   })
}) 
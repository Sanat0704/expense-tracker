let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

const form = document.getElementById("expense-form");
const expenseBody = document.getElementById("expense-body");
const totalSpent = document.getElementById("total-spent");
const transactionCount = document.getElementById("transaction-count");
const categoryBreakdown = document.getElementById("category-breakdown");

const filterCategory = document.getElementById("filter-category");
const filterFrom = document.getElementById("filter-from");
const filterTo = document.getElementById("filter-to");
const clearFiltersBtn = document.getElementById("clear-filters");

const categoryColors = {
  Food: "#e55039",
  Transport: "#3c40c6",
  Entertainment: "#ff9ff3",
  Bills: "#1dd1a1",
  Shopping: "#f368e0",
  Other: "#576574"
};

let categoryChartInstance;
let monthlyChartInstance;

// ===== Save & Render =====
function saveExpenses() { localStorage.setItem("expenses", JSON.stringify(expenses)); }

function getCategoryClass(category) {
  switch(category){
    case "Food": return "category-food";
    case "Transport": return "category-transport";
    case "Entertainment": return "category-entertainment";
    case "Bills": return "category-bills";
    case "Shopping": return "category-shopping";
    case "Other": return "category-other";
    default: return "";
  }
}

function renderExpenses(list = expenses){
  expenseBody.innerHTML = "";
  if(list.length===0){
    expenseBody.innerHTML = `<tr><td colspan="5" style="text-align:center;">No expenses found</td></tr>`;
  } else {
    list.forEach((exp,index)=>{
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${exp.date}</td>
        <td class="${getCategoryClass(exp.category)}">${exp.category}</td>
        <td>${exp.description || "-"}</td>
        <td>₹${exp.amount.toFixed(2)}</td>
        <td><button class="delete-btn" data-index="${index}">Delete</button></td>
      `;
      expenseBody.appendChild(tr);
    });
  }

  renderStats(list);

  document.querySelectorAll(".delete-btn").forEach(btn=>{
    btn.addEventListener("click", e=>{
      const idx = e.target.dataset.index;
      expenses.splice(idx,1);
      saveExpenses();
      applyFilters();
    });
  });
}

// ===== Render Statistics =====
function renderStats(list){
  const total = list.reduce((sum,e)=>sum+Number(e.amount),0);
  totalSpent.textContent = total.toFixed(2);
  transactionCount.textContent = list.length;

  const breakdown={};
  list.forEach(e=>{ breakdown[e.category]=(breakdown[e.category]||0)+Number(e.amount); });

  // Colored bars
  categoryBreakdown.innerHTML="";
  const maxVal = Math.max(...Object.values(breakdown),1);
  for(const [cat,val] of Object.entries(breakdown)){
    const li=document.createElement("li");
    li.innerHTML = `<strong>${cat}</strong>: ₹${val.toFixed(2)}
      <div class="bar" style="width:${(val/maxVal)*100}%; background:${categoryColors[cat]}"></div>`;
    categoryBreakdown.appendChild(li);
  }

  // Pie Chart
  const ctx = document.getElementById('categoryChart');
  if(ctx){
    const chartCtx = ctx.getContext('2d');
    if(categoryChartInstance) categoryChartInstance.destroy();
    categoryChartInstance = new Chart(chartCtx,{
      type:'pie',
      data:{
        labels:Object.keys(breakdown),
        datasets:[{ data:Object.values(breakdown), backgroundColor:Object.keys(breakdown).map(cat=>categoryColors[cat]) }]
      },
      options:{ responsive:true, plugins:{ legend:{position:'bottom'}, title:{display:true,text:'Spending by Category (Pie Chart)'} } }
    });
  }

  // Monthly Summary
  const monthlyCtx = document.getElementById('monthlyChart');
  if(monthlyCtx){
    const ctx2 = monthlyCtx.getContext('2d');
    if(monthlyChartInstance) monthlyChartInstance.destroy();
    const monthlyData={};
    list.forEach(e=>{
      const month = new Date(e.date).toLocaleString('default',{month:'short',year:'numeric'});
      monthlyData[month] = (monthlyData[month]||0)+Number(e.amount);
    });
    const months = Object.keys(monthlyData);
    const values = Object.values(monthlyData);

    monthlyChartInstance = new Chart(ctx2,{
      type:'bar',
      data:{ labels:months, datasets:[{label:'Spending ₹', data:values, backgroundColor:'#4c51bf'}] },
      options:{ responsive:true, plugins:{legend:{display:false},title:{display:true,text:'Monthly Spending Summary'}}, scales:{y:{beginAtZero:true}} }
    });
  }
}

// ===== Form Submit =====
form.addEventListener("submit",e=>{
  e.preventDefault();
  const amount=parseFloat(document.getElementById("amount").value);
  const category=document.getElementById("category").value;
  const date=document.getElementById("date").value;
  const description=document.getElementById("description").value;

  if(amount<=0){ alert("Amount must be positive"); return; }
  if(new Date(date)>new Date()){ alert("Date cannot be in the future"); return; }

  expenses.push({amount, category, date, description});
  saveExpenses();
  form.reset();
  applyFilters();
});

// ===== Filters =====
function applyFilters(){
  let filtered=[...expenses];
  const cat=filterCategory.value;
  const from=filterFrom.value;
  const to=filterTo.value;

  if(cat!=="All") filtered=filtered.filter(e=>e.category===cat);
  if(from) filtered=filtered.filter(e=>e.date>=from);
  if(to) filtered=filtered.filter(e=>e.date<=to);

  renderExpenses(filtered);
}

filterCategory.addEventListener("change",applyFilters);
filterFrom.addEventListener("change",applyFilters);
filterTo.addEventListener("change",applyFilters);
clearFiltersBtn.addEventListener("click",()=>{
  filterCategory.value="All";
  filterFrom.value="";
  filterTo.value="";
  renderExpenses();
});

// ===== Initial Render =====
renderExpenses();

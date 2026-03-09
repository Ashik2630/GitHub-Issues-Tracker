let allIssues = [];
let currentStatus = "all-btn";

  const loadIssues = async () => {
    manageSpinner(true)
    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    const data = await res.json();
    const totalIssues = data.data;
    allIssues = totalIssues;
    return totalIssues;
  }

const issuesDetails = async (id) => {
  const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`;
  const res = await fetch(url);
  const details = await res.json();
  displayDetails(details.data);
};

const displayDetails = (issue) => {
  console.log(issue);
  const issueDetails = document.getElementById("details-container");
  const date = new Date(issue.createdAt).toLocaleDateString();
  issueDetails.innerHTML = `
  <div class="main bg-white space-y-5">
        <h1 class="text-2xl font-bold ">${issue.title}</h1>
        <div class="flex gap-5 ">
          <p class="bg-[#00A96E] px-2 py-1 rounded-full text-white">Opened</p>
          <li class="ml-2">Opened by ${issue.assignee} </li>
          <li class="ml-2">${date}</li>
        </div>
         <!-- Tags -->
        <div class="flex gap-2">
         ${issue.labels
           .map((label) => {
             let color = "";
             let icon = "";

             if (label === "bug") {
               color = "bg-red-50 text-red-500";
               icon = `<i class="fa-solid fa-bug"></i>`;
             }

             if (label === "enhancement") {
               color = "bg-[#defce8] text-[#00A96E]";
               icon = `<img src="./assets/Sparkle.png" class="w-4 h-4"/>`;
             }

             if (label === "help wanted") {
               color = "bg-[#f2ebd0] text-[#D97706] border border-[#fde68a]";
               icon = `<img src="./assets/help.png" class="w-4 h-4"/>`;
             }
             if (label === "documentation") {
               color = "bg-[#baa24136] text-[#baa141] border border-[#eeeff2]";
               icon = `<i class="fa-brands fa-readme"></i>`;
             }

             if (label === "good first issue") {
               color = "bg-[#eeeff2] text-[#9CA3AF] border border-[#eeeff2]";
               icon = `<i class="fa-solid fa-thumbs-up"></i>`;
             }

             return `
            <span class="inline-flex items-center gap-1.5 ${color} text-[14px] font-bold px-3 py-1.5 rounded-full">
              ${icon}
              ${label}
            </span>
                `;
           })
           .join("")}
        </div>
        <p >The navigation menu doesn't collapse properly on mobile devices. Need to fix the responsive behavior.</p>
        <div class="bg-[#64748b23] flex gap-20 px-5">
          <div class="left">
            <span class="text-[18px] ">Assignee:</span> <br>
          <h1 class="text-xl font-bold">
              ${issue.assignee || "No Assignee"}
          </h1>
          </div>
          <div class="right"> 
            <span class="text-[18px] ">Priority:</span>
            <p class="bg-[#EF4444] text-white text-center rounded-full">High</p>
          </div>
        </div>
    </div>
   `;

  document.getElementById("issues_modal").showModal();
};

const manageSpinner = (status) => {
  const spinner = document.getElementById("spinner");
  spinner.innerHTML = `<div> <span class="loading loading-spinner loading-xl"></span></div>`;
  if (status === true) {
    document.getElementById("spinner").classList.remove("hidden");
    document.getElementById("issues-container").classList.add("hidden");
  } else {
    document.getElementById("issues-container").classList.remove("hidden");
    document.getElementById("spinner").classList.add("hidden");
  }
};

const displayIssues = (issues) => {
  const issuesContainer = document.getElementById("issues-container");
  issuesContainer.innerHTML = "";
  document.getElementById("count").innerText = issues.length;


  issues.forEach((issue) => {
    const cardDiv = document.createElement("div");

    const date = new Date(issue.createdAt).toLocaleDateString();
    cardDiv.innerHTML = ` 
       <div 
      class="max-w-[400px] h-full rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden font-sans ml-5 md:ml-0 hover:scale-102 hover:-translate-y-2 transition-all duration-400 cursor-pointer rounded-t-1g 
      "> 
     
      
      <!-- Top Color Bar -->
      <div class="h-1 ${
        issue.status === "open" ? "bg-emerald-500" : "bg-[#A855F7]"
      }"></div>

      <!-- Card Body -->
      <div class="p-5">
        <!-- Header -->
        <div class="flex items-center justify-between mb-4">
          <!-- Status Icon -->
          <div class="flex items-center justify-center">
            <div >
              <img class="h-6 w-6 rounded-full"
                src="${
                  issue.status === "open"
                    ? "./assets/Open-Status.png"
                    : "./assets/Closed-Status .png"
                }"
                alt="status"
              />
            </div>
          </div>

          <!-- Priority Badge -->
          <span
            class="${
              issue.priority === "high"
                ? "bg-red-50 text-red-400"
                : issue.priority === "medium"
                  ? "bg-[#fff6d1] text-[#F59E0B]"
                  : "bg-[#eeeff2] text-[#9CA3AF]"
            } text-xs font-bold px-4 py-1.5 rounded-full tracking-wide"
          >
            ${issue.priority}
          </span>
        </div>

        <!-- Title -->
        <h3 onclick="issuesDetails(${issue.id})" class="text-gray-800 font-bold text-lg leading-tight mb-2 cursor-pointer">
          ${issue.title}
        </h3>

        <!-- Description -->
        <p class="text-slate-500 text-sm leading-relaxed mb-6">
          ${issue.description}
        </p>

      <!-- Tags -->
        <div class="flex gap-2 mb-3">
         ${issue.labels
           .map((label) => {
             let color = "";
             let icon = "";

             if (label === "bug") {
               color = "bg-red-50 text-red-500";
               icon = `<i class="fa-solid fa-bug"></i>`;
             }

             if (label === "enhancement") {
               color = "bg-[#defce8] text-[#00A96E]";
               icon = `<img src="./assets/Sparkle.png" class="w-4 h-4"/>`;
             }

             if (label === "help wanted") {
               color = "bg-[#f2ebd0] text-[#D97706] border border-[#fde68a]";
               icon = `<img src="./assets/help.png" class="w-4 h-4"/>`;
             }
             if (label === "documentation") {
               color = "bg-[#baa24136] text-[#baa141] border border-[#eeeff2]";
               icon = `<i class="fa-brands fa-readme"></i>`;
             }

             if (label === "good first issue") {
               color = "bg-[#eeeff2] text-[#9CA3AF] border border-[#eeeff2]";
               icon = `<i class="fa-solid fa-thumbs-up"></i>`;
             }

             return `
            <span class="inline-flex items-center gap-1.5 ${color} text-[14px] font-bold px-3 py-1.5 rounded-full">
              ${icon}
              ${label}
            </span>
                `;
           })
           .join("")}
        </div>
      <!-- Footer -->
      <div class="border-t border-gray-100 p-5 pt-4">
        <p class="text-slate-500 text-sm">#1 by ${issue.author}</p>
        <p class="text-slate-400 text-sm mt-1">${date}</p>
      </div>
    </div>
        `;
    issuesContainer.appendChild(cardDiv);
  });
  manageSpinner(false);
};

document.getElementById("all-btn").addEventListener("click", () => {
  loadIssues().then(res => {
    document.getElementById("all-img").src = "./assets/Aperture.png";
    displayIssues(res)
  })
});

document.getElementById("open-btn").addEventListener("click", () => {
  loadIssues().then(res => {
    const openIssues = res.filter((issue) => issue.status === "open");
  displayIssues(openIssues);
  document.getElementById("all-img").src = "./assets/Open-Status.png";
  })
  
});

document.getElementById("closed-btn").addEventListener("click", () => {
   loadIssues().then(res => {
    const closedIssues = res.filter((issue) => issue.status === "closed");
  displayIssues(closedIssues);
  document.getElementById("all-img").src = "./assets/Closed-Status .png";
  })
  
});

const allBtn = document.getElementById("all-btn");
const openBtn = document.getElementById("open-btn");
const closedBtn = document.getElementById("closed-btn");

function toggleStyle(id) {
  allBtn.classList.remove("btn-primary");
  openBtn.classList.remove("btn-primary");
  closedBtn.classList.remove("btn-primary");

  allBtn.classList.add("btn-outline");
  openBtn.classList.add("btn-outline");
  closedBtn.classList.add("btn-outline");

  const selected = document.getElementById(id);

  selected.classList.remove("btn-outline");
  selected.classList.add("btn-primary");
}


loadIssues().then(res => {
  displayIssues(res);
})

document.getElementById("btn-search").addEventListener("click", () => {
  const input = document.getElementById("input-search");
  const searchValue = input.value.trim();

  fetch(
    `https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchValue}`,
  )
    .then((res) => res.json())
    .then((data) => {
      // console.log(data.data);
      displayIssues(data.data);
    });
});

let allIssues = [];
let currentStatus = "all-btn";

const loadIssues = () =>
  fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then((res) => res.json())
    .then((data) => {
      allIssues = data.data;
      displayIssues(allIssues);
    });

const displayIssues = (issues) => {
  // console.log(issues)
  const issuesContainer = document.getElementById("issues-container");
  issuesContainer.innerHTML = "";
  document.getElementById("count").innerText = issues.length;

  //   console.log(issuesCount);
  issues.forEach((issue) => {
    const cardDiv = document.createElement("div");
    // cardDiv.className ="btn btn-primary"
    const date = new Date(issue.createdAt).toLocaleDateString();
    cardDiv.innerHTML = ` 
       <div
      class="max-w-sm h-full rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden font-sans"
    > 
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
                    : "./assets/Closed- Status .png"
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
                  ? "bg-yellow-50 text-yellow-400"
                  : "bg-[#9CA3AF] text-[#ced9ec]"
            } text-xs font-bold px-4 py-1.5 rounded-full tracking-wide"
          >
            ${issue.priority}
          </span>
        </div>

        <!-- Title -->
        <h3 class="text-gray-800 font-bold text-lg leading-tight mb-2">
          ${issue.title}
        </h3>

        <!-- Description -->
        <p class="text-slate-500 text-sm leading-relaxed mb-6">
          ${issue.description}
        </p>

        <!-- Tags -->
        <div class="flex gap-2">
          <span
            class="inline-flex items-center gap-1.5 bg-red-50 text-red-500 text-xs font-bold px-3 py-1.5 rounded-full border border-red-100"
          >
            <i class="fa-solid fa-bug"></i>
            BUG
          </span>

          <span
            class="inline-flex items-center gap-1.5 bg-orange-50 text-orange-600 text-xs font-bold px-3 py-1.5 rounded-full border border-orange-100"
          >
            <i class="fa-solid fa-circle-question"></i>
            HELP WANTED
          </span>
        </div>
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
};

document.getElementById("all-btn").addEventListener("click", () => {
  displayIssues(allIssues);
  document.getElementById("all-img").src = "./assets/Aperture.png";
});

document.getElementById("open-btn").addEventListener("click", () => {
  const openIssues = allIssues.filter((issue) => issue.status === "open");
  displayIssues(openIssues);
  document.getElementById("all-img").src = "./assets/Open-Status.png";
});

document.getElementById("closed-btn").addEventListener("click", () => {
  const closedIssues = allIssues.filter((issue) => issue.status === "closed");
  displayIssues(closedIssues);
  document.getElementById("all-img").src = "./assets/Closed- Status .png";
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

loadIssues();

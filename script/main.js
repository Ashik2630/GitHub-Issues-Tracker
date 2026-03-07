let allIssues = [];
let currentStatus = "all-btn";

const loadIssues = () => fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues')
.then(res => res.json())
.then(data => {
    allIssues = data.data;
    displayIssues(allIssues);
});


const displayIssues = (issues) => {
    // console.log(issues)
    const issuesContainer = document.getElementById('issues-container');
    issuesContainer.innerHTML = "";
    issues.forEach(issue => {
        console.log(issue)
        const cardDiv = document.createElement('div');
        // cardDiv.className ="btn btn-primary"
        cardDiv.innerHTML = ` 
       <div class="card card-border bg-base-100 w-96">
          <div class="card-body">
            <h2 class="card-title">${issue.title}</h2>
            <p>
              A card component has a figure, a body part, and inside body there
              are title and actions parts
            </p>
            <div class="card-actions justify-end">
              <button class="btn btn-primary">Buy Now</button>
            </div>
          </div>
        </div>
        `;
        issuesContainer.appendChild(cardDiv);
    });

}

document.getElementById('all-btn').addEventListener("click", () => {
    displayIssues(allIssues);
})

document.getElementById('open-btn').addEventListener("click", () => {
    const openIssues = allIssues.filter(issue => issue.status === 'open')
    displayIssues(openIssues);
})

document.getElementById("closed-btn").addEventListener("click", () => {
    const closedIssues = allIssues.filter(issue => issue.status === 'closed')
    displayIssues(closedIssues);
})


const allBtn = document.getElementById('all-btn');
const openBtn = document.getElementById('open-btn');
const closedBtn = document.getElementById('closed-btn')

function toggleStyle(id) {

  allBtn.classList.remove("btn-primary");
  allBtn.classList.add("btn-outline");

  openBtn.classList.remove("btn-primary");
  openBtn.classList.add("btn-outline");

  closedBtn.classList.remove("btn-primary");
  closedBtn.classList.add("btn-outline");

  const selected = document.getElementById(id);

  selected.classList.remove("btn-outline");
  selected.classList.add("btn-primary");
}

const issuesCount = document.getElementById('issues-count');
issuesCount.innerHTML = `
<img src="./assets/Aperture.png" alt="">
        <div class="flex justify-between">
            <div>
            <h1>Issues</h1>
            <p>Track and manage your project issues</p>
        </div>
        <div class="flex ">
            <p>Open</p>
            <p>Closed</p>
        </div>
        </div>
`


loadIssues();
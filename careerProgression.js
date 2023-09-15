const job_btn = document.querySelectorAll(".job-btn");
const job_detail = document.querySelector(".job-details");
const salary = document.getElementById("salary");
const duties = document.getElementById("duties");
const opportunity = document.getElementById("opportunity");
const cons = document.getElementById("cons");

job_btn.forEach(function (btn) {
	btn.addEventListener("click", function (event) {
		let job = event.target.textContent;
		job_detail.style.opacity = "1";
		found(job);
	});
});

function found(job) {
	fetch("MOCK_DATA.json")
		.then((response) => {
			if (!response.ok) {
				throw new Error("Network response was not ok");
			}
			return response.json();
		})
		.then((data) => {
			// Find the object with the specified job
			const jobToFind = job;
			const foundObject = data.find((item) => item.Job === jobToFind);

			if (foundObject) {
				// DOM Work
				salary.textContent = foundObject.Salary;
				duties.textContent = foundObject.Duties;
				opportunity.textContent = foundObject.Opportunities;
				cons.textContent = foundObject.Cons;
			} else {
				console.log('Object with Job "' + jobToFind + '" not found');
			}
		})
		.catch((error) => {
			console.error("Error:", error);
		});
}

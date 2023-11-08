document.getElementById("profileInfoButton").addEventListener("click", function() {
	var profileInfoForm = document.getElementById("profileInfoForm");
	profileInfoForm.classList.remove("hidden");
});

document.getElementById("profileInfoForm").addEventListener("click", function(event) {
	if (event.target === this) {
			this.classList.add("hidden");
	}
});

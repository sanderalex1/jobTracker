export const getApplications = async (req, res) => {
  res.json([
    { id: "1", company: "Google", role: "Frontend Developer" },
    { id: "2", company: "Stripe", role: "React Engineer" },
  ]);
};

export const createApplication = async (req, res) => {
  const applicationData = req.body;
  console.log(applicationData);
  res.json({ message: "Application successfully received" });
};

export const updateApplication = async (req, res) => {
  const applicationData = req.params.id;
  console.log(applicationData);
  res.json({ message: "No real data yet" });
};

export const deleteApplication = async (req, res) => {
  const applicationData = req.params.id;
  console.log(applicationData);
  res.json({ message: "No real data yet" });
};


# 🧠 Tech Stack Visualizer

A web app to visualize the tech stacks (languages used) in any public GitHub repository. Built with **Vite**, **React**, **Tailwind CSS**, **Axios**, and **Chart.js**.

🌐 **Live Demo**: [tech-stack-visualizer.vercel.app](https://tech-stack-visualizer.vercel.app/)


---

## 🚀 Features

- 🔍 **Search Any GitHub Repo**  
  Just enter `username/repo-name` to fetch language usage.

- 📊 **Pie Chart of Languages**  
  Displays language usage as a percentage breakdown using Chart.js.

- ⚡ **Fast & Lightweight**  
  Built with Vite for blazing fast performance.

- 🎨 **Responsive Design**  
  Clean and simple UI using Tailwind CSS.

---

## 🔧 Technologies Used

- [Vite](https://vitejs.dev/) – Fast dev build tool
- [React](https://reactjs.org/) – UI library
- [Tailwind CSS](https://tailwindcss.com/) – Utility-first CSS framework
- [Chart.js](https://www.chartjs.org/) – Interactive charts
- [Axios](https://axios-http.com/) – API requests

---

## 📦 Installation

```bash
git clone https://github.com/kushansm/Tech-Stack-Visualizer.git
cd Tech-Stack-Visualizer
npm install
````

### 🔐 Add `.env` File

Create a `.env` file in the root:

```env
VITE_GITHUB_TOKEN=your_personal_access_token
```

> ⚠️ Required to bypass GitHub API rate limits.
> You can create a token [here](https://github.com/settings/tokens) with `public_repo` scope.

---

## 🛠 Usage

```bash
npm run dev
```

Visit [http://localhost:5173](http://localhost:5173) in your browser.

Enter any public GitHub repo 



---

## 📤 Deployment

Deployed on [Vercel](https://vercel.com/):

* **Build Command**: `npm run build`
* **Output Directory**: `dist`
* **Environment Variable**: `VITE_GITHUB_TOKEN`

---

## 🙌 Author

**Kushan Siriwardhana**
📧 [kushandileep12@gmail.com](mailto:kushandileep12@gmail.com)
🔗 [GitHub](https://github.com/kushansm) | [LinkedIn](https://linkedin.com/in/kushansm)

---


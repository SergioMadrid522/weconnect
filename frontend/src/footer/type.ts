//Main(login) props

/* FOOTER */
//projects
type ProjectList = {
  link: string;
  projectName: string;
};
export type ProjectListProps = {
  projects: ProjectList[];
};

// languageList
type languages = {
  data: string;
  language: string;
};
export type languageList = {
  list: languages[];
};

// credits props
export type creditsProps = {
  credits: string[];
};

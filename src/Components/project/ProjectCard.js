import styles from './ProjectCard.module.css';

function ProjectCard({ id, name, budget, category, handleRemove }) {
  
  console.log(category)
    const categoryName = category && category.name ? category.name : 'Sem categoria';
  const categoryText = categoryName.toLowerCase();

  return (
    <div className={styles.project_card}>
      <h4>{name}</h4>
      <p>
        <span>Orçamento:</span> R$: {budget}
      </p>
      <p className={styles.category_text}>
        <span className={`${styles[categoryText]}`}></span> {categoryName}
      </p>
      <div>
        <p>Editar</p>
        <p>Remover</p>
      </div>
    </div>
  );
}

export default ProjectCard;

function BudgetPreview() {
  return (
    <section className="preview-card">
      <p className="card-label">Monthly overview</p>

      <h3>$1,240 remaining</h3>

      <div className="progress-bar">
        <div className="progress-fill"></div>
      </div>

      <div className="summary-row">
        <div>
          <span>Budget</span>
          <strong>$2,000</strong>
        </div>

        <div>
          <span>Spent</span>
          <strong>$760</strong>
        </div>
      </div>
    </section>
  )
}

export default BudgetPreview
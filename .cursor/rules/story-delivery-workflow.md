# Story Delivery Workflow Rule

- For each story: set status `in-progress` before coding, `review` after validation, then `done`.
- Keep story execution vertical-slice and acceptance-criteria driven.
- After substantive edits run:
  - `npm run test:structure`
  - `npm run lint`
  - `npm run typecheck`
  - `npm run test`
  - `npm run build`
- Update `_bmad-output/sprint-status.yaml` and story file completion notes in the same pass.

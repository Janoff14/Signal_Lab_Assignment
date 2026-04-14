# Frontend Patterns Rule

- Use TanStack Query (`useQuery` / `useMutation`) for all server state. Do not use SWR, Redux, Zustand, or manual fetch-in-useEffect.
- Use React Hook Form for all form state. Do not use Formik or uncontrolled native forms.
- Use shadcn/ui components (Button, Card, Table, Badge, Select, etc.) for UI primitives. Do not introduce Material UI, Chakra, Ant Design, or other component libraries.
- Use Tailwind CSS utility classes for layout and styling. Do not use CSS modules, styled-components, or Emotion.
- Keep components in `src/components/` (shared) and `src/features/<domain>/` (domain-specific).
- Use the `@/` path alias (mapped to `src/`) for all imports.
- Mutations must invalidate related queries on success via `queryClient.invalidateQueries`.
- Show loading states on buttons during mutations. Show error feedback via toast or inline message.
- Keep pages in `src/app/` following Next.js App Router conventions.

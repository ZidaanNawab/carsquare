<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Car inventory lives in `src/data/cars.ts`; each object auto-generates `/cars/<slug>` (and sitemap entry). Why: adding a car must be a one-object edit.
- Shortlist/compare are localStorage stores in `src/lib/saved.ts` (no backend). Why: no accounts needed for buyers.

import { useState } from 'react'
import { InteriorPageShell } from '../components/InteriorPageShell'
import { PersonalizeSection } from '../components/PersonalizeSection'
import { products } from '../data/siteContent'

function referencesFromUrl() {
  const validIds = new Set(products.map((product) => product.id))
  const requestedIds = new URLSearchParams(window.location.search)
    .getAll('references')
    .flatMap((value) => value.split(','))
    .map((value) => value.trim())
    .filter((value) => validIds.has(value))

  return [...new Set(requestedIds)].slice(0, 3)
}

export function PersonalizePage() {
  const [selectedReferences, setSelectedReferences] = useState<string[]>(
    referencesFromUrl,
  )
  const [selectionNotice, setSelectionNotice] = useState(() =>
    selectedReferences.length
      ? `${selectedReferences.length} inspiration model${
          selectedReferences.length === 1 ? '' : 's'
        } carried over from the collection.`
      : '',
  )

  return (
    <InteriorPageShell activePage="personalize" mainClassName="personalize-page">
      <PersonalizeSection
        selectedReferences={selectedReferences}
        onSelectedReferencesChange={setSelectedReferences}
        selectionNotice={selectionNotice}
        onSelectionNoticeChange={setSelectionNotice}
        headingLevel="h1"
      />
    </InteriorPageShell>
  )
}

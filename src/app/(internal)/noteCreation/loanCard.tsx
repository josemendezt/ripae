import { Card, Input, Label } from '@/components/ui';
import { cn } from '@/lib/utils';
import { useNoteStore } from '@/stores/noteStore';
import { Note } from '@/types/note';
import { X } from 'lucide-react';
import React from 'react';

const LoanCard = React.memo(({ note }: { note: Note }) => {
  const { removeNote, updateNote } = useNoteStore();

  return (
    <Card
      key={note.id}
      className={cn(
        'w-68 p-4',
        note.isDeleting &&
          'transition-transform duration-150 ease-in-out scale-0'
      )}
    >
      <div className="relative bottom-2">
        <div
          className="mb-0 pb-0 w-4 ml-auto cursor-pointer"
          onClick={() => {
            const tempNote = note;
            tempNote.isDeleting = true;
            updateNote(tempNote);
            setTimeout(() => {
              removeNote(note.id);
            }, 250);
          }}
        >
          <X />
        </div>
        <div className="px-4 text-center">
          <div>
            <Label className="text-md font-semibold">Amount</Label>
            <Input
              className="text-2xl text-center"
              value={note.value}
              onChange={(e) => {
                const tempNote = note;
                tempNote.value = Number(e.target.value);
                updateNote(tempNote);
              }}
            />
          </div>
          <div className="flex justify-between">
            <div>
              <Label className="font-semibold">Period</Label>
              <div className="text-lg">45 - 90 Days</div>
            </div>
            <div>
              <Label className="font-semibold">Interest</Label>
              <div className="text-lg">5 % - 11%</div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
});

export default LoanCard;

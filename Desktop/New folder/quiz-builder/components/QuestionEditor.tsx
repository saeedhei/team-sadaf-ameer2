'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Trash2, Plus, CheckCircle2 } from 'lucide-react';

// Single question data type definition
export interface QuestionData {
  id: string;
  questionText: string;
  options: string[];
  correctOptionIndex: number;
  marks: number;
}

interface QuestionEditorProps {
  question?: QuestionData;
  index?: number;
  onUpdateQuestion?: (updated: QuestionData) => void;
  onDeleteQuestion?: (id: string) => void;
}

export default function QuestionEditor({
  question = { id: '1', questionText: '', options: ['', ''], correctOptionIndex: 0, marks: 5 },
  index = 0,
  onUpdateQuestion = () => {},
  onDeleteQuestion = () => {},
}: QuestionEditorProps) {
  
  // Handle option text change securely
  const handleOptionChange = (optionIndex: number, value: string) => {
    const updatedOptions = [...question.options];
    updatedOptions[optionIndex] = value;
    onUpdateQuestion({ ...question, options: updatedOptions });
  };

  // Add a new empty option to this question
  const handleAddOption = () => {
    if (question.options.length >= 6) return; // limit max 6 options
    onUpdateQuestion({
      ...question,
      options: [...question.options, ''],
    });
  };

  // Remove a specific option item
  const handleRemoveOption = (optionIndex: number) => {
    if (question.options.length <= 2) return; // keep minimum 2 options
    const updatedOptions = question.options.filter((_, idx) => idx !== optionIndex);
    
    let newCorrectIndex = question.correctOptionIndex;
    if (question.correctOptionIndex === optionIndex) {
      newCorrectIndex = 0;
    } else if (question.correctOptionIndex > optionIndex) {
      newCorrectIndex--;
    }

    onUpdateQuestion({
      ...question,
      options: updatedOptions,
      correctOptionIndex: newCorrectIndex,
    });
  };

  return (
    <Card className="bg-white border-slate-200 shadow-sm rounded-2xl">
      <CardContent className="p-4 sm:p-6 space-y-4">
        
        {/* Header with question number and delete question button */}
        <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <span className="text-xs sm:text-sm font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
            Question #{index + 1}
          </span>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => onDeleteQuestion(question.id)}
            className="text-rose-500 hover:text-rose-700 hover:bg-rose-50 h-8 px-2 text-xs"
          >
            <Trash2 className="w-4 h-4 mr-1" /> Delete Question
          </Button>
        </div>

        {/* Main Question Title Input */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Question Title / Prompt
          </label>
          <Input
            placeholder="e.g. What is the primary purpose of React useEffect hook?"
            value={question.questionText}
            onChange={(e) =>
              onUpdateQuestion({ ...question, questionText: e.target.value })
            }
            className="bg-white border-slate-300 text-xs sm:text-sm text-slate-900"
          />
        </div>

        {/* Options List section */}
        <div className="space-y-2">
          <label className="block text-xs font-semibold text-slate-700">
            Multiple Choice Options (Select green check for correct answer)
          </label>
          
          {question.options.map((opt, optIdx) => (
            <div key={optIdx} className="flex items-center gap-2">
              {/* Correct option selector button */}
              <button
                type="button"
                onClick={() =>
                  onUpdateQuestion({ ...question, correctOptionIndex: optIdx })
                }
                title="Mark as correct answer"
                className={`p-1.5 rounded-lg border transition ${
                  question.correctOptionIndex === optIdx
                    ? 'bg-emerald-500 text-white border-emerald-500'
                    : 'bg-slate-50 text-slate-400 border-slate-200 hover:border-slate-300'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
              </button>

              {/* Option input field */}
              <Input
                placeholder={`Option ${optIdx + 1}`}
                value={opt}
                onChange={(e) => handleOptionChange(optIdx, e.target.value)}
                className="bg-white border-slate-300 text-xs sm:text-sm text-slate-900 flex-1"
              />

              {/* Option delete button */}
              {question.options.length > 2 && (
                <button
                  type="button"
                  onClick={() => handleRemoveOption(optIdx)}
                  className="text-slate-400 hover:text-rose-500 p-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          ))}

          {/* Add Option Button with explicit type="button" */}
          {question.options.length < 6 && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleAddOption}
              className="text-xs text-indigo-600 border-dashed border-indigo-300 hover:bg-indigo-50 mt-2"
            >
              <Plus className="w-3.5 h-3.5 mr-1" /> Add Option
            </Button>
          )}
        </div>

        {/* Marks per question section */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
          <span className="text-xs text-slate-500 font-medium">Question Weightage</span>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-600 font-semibold">Marks:</span>
            <Input
              type="number"
              min={1}
              value={question.marks}
              onChange={(e) =>
                onUpdateQuestion({
                  ...question,
                  marks: parseInt(e.target.value) || 1,
                })
              }
              className="w-20 bg-white border-slate-300 text-xs text-slate-900 h-8"
            />
          </div>
        </div>

      </CardContent>
    </Card>
  );
}
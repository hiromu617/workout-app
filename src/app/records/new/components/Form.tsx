"use client";

import { useState, FC } from "react";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from "@/components/ui/select";
import { useFormState } from "react-dom";
import { submit } from "../actions/submit";
import { BodyPart, Exercise } from "@/lib/prismaClient";
import { Input } from "@/components/ui/input";

type bodyPartWithExercise = BodyPart & {
  exercises: Exercise[];
};

type Props = {
  bodyPartsWithExercise: bodyPartWithExercise[];
};

export const Form: FC<Props> = ({ bodyPartsWithExercise }) => {
  const [state, dispatch] = useFormState(submit, undefined);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedExercise, setSelectedExercise] = useState<Exercise>();

  return (
    <form action={dispatch}>
      <Card>
        <CardHeader>
          <CardTitle>新規記録</CardTitle>
        </CardHeader>
        <CardContent>
          <Label className="block">
            <div className="mb-3">日付</div>
            <input type="hidden" name="date" value={date?.toDateString()} />
          </Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-[240px] justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <div className="mt-5">
            <div className="mb-3">メニュー一覧</div>
            <div className="flex items-center gap-5">
              <Label>
                メニュー
                <Select
                  name="exerciseId"
                  onValueChange={(value) => {
                    const selected = bodyPartsWithExercise
                      .flatMap((b) => b.exercises)
                      .find((e) => String(e.id) === value);
                    setSelectedExercise(selected);
                  }}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="未選択" />
                  </SelectTrigger>
                  <SelectContent>
                    {bodyPartsWithExercise.map((bodyPart) => {
                      return (
                        <SelectGroup key={bodyPart.id}>
                          <SelectLabel>{bodyPart.name}</SelectLabel>
                          {bodyPart.exercises.map((exercise) => {
                            return (
                              <SelectItem
                                value={String(exercise.id)}
                                key={exercise.id}
                              >
                                {exercise.name}
                              </SelectItem>
                            );
                          })}
                        </SelectGroup>
                      );
                    })}
                  </SelectContent>
                </Select>
              </Label>
              {selectedExercise && (
                <>
                  {selectedExercise.hasWeight && (
                    <Label>
                      重さ
                      <Input type="number" name="weight" />
                    </Label>
                  )}
                  {selectedExercise.isUnitOfTime ? (
                    <Label>
                      分数
                      <Input type="number" name="min" />
                    </Label>
                  ) : (
                    <Label>
                      回数
                      <Input type="number" name="time" />
                    </Label>
                  )}
                  <Label>
                    Rep数
                    <Input type="number" name="rep" />
                  </Label>
                </>
              )}
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" type="submit">
            記録する
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};

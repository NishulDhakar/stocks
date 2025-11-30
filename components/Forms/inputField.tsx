import React from 'react'
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const InputField = ({ name, label, placeholder, type = "text", register, error, validation, disabled, value }: FormInputProps) => {
    return (
        <div className="space-y-2">
            <Label htmlFor={name} className="text-sm font-medium text-muted-foreground">
                {label}
            </Label>
            <Input
                type={type}
                id={name}
                placeholder={placeholder}
                disabled={disabled}
                value={value}
                className={cn(
                    'h-12 bg-white/5 border-white/10 text-foreground placeholder:text-muted-foreground/50 focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all rounded-xl',
                    { 'opacity-50 cursor-not-allowed': disabled }
                )}
                {...register(name, validation)}
            />
            {error && <p className="text-sm text-red-400 mt-1">{error.message}</p>}
        </div>
    )
}
export default InputField